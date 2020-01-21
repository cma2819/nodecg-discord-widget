import { NodeCG } from "./nodecg";
import * as discord from "discord.js";
import { isEqual } from "lodash";

import { Speakers } from "../nodecg/generated/speakers";

const setup = async (nodecg: NodeCG) => {

    const token = nodecg.bundleConfig.token;
    if (!token) {
        nodecg.log.error('Discord token is not defined.');
        nodecg.log.error('You must set discord token in bundle\'s config.');
        return;
    }
    const targetChannelId = nodecg.bundleConfig.channelId;
    if (!targetChannelId) {
        nodecg.log.error('Channel ID is not defined.');
        nodecg.log.error('You must set channel ID in bundle\'s config.');
        return;
    }

    const replicants = {
        speakers: nodecg.Replicant('speakers', { defaultValue: [] }),
        status: nodecg.Replicant('status', { defaultValue: 'connecting' })
    };

    const client = new discord.Client();
    try {
        await client.login(token);
    } catch (e) {
        nodecg.log.error('Failed to login.');
        nodecg.log.error(e);
    }

    const channel = client.channels.get(targetChannelId);
    if (!channel) {
        nodecg.log.error('Target Channel is not found.');
        return;
    }
    if (!(channel instanceof discord.VoiceChannel)) {
        nodecg.log.error('Target Channel is not voice channel.');
        return;
    }

    channel.join().then(() => {
        replicants.status.value = 'connected';
        const intervalForUpdate = nodecg.bundleConfig.interval || 1000;
        const ignoreUserIds = nodecg.bundleConfig.ignoreUserIds || [];
    
        setInterval(() => {
            const speakers: Speakers = channel.members.filter(member => member.id !== client.user.id && ignoreUserIds.indexOf(member.id) < 0).map((member) => {
                return {
                    member: {
                        displayName: member.displayName,
                        id: member.id,
                        user: {
                            avatarURL: member.user.avatarURL,
                            id: member.user.id,
                            username: member.user.username
                        }
                    },
                    speaking: member.speaking || false
                }
            })
            if (!isEqual(replicants.speakers.value, speakers)) {
                replicants.speakers.value = speakers;
            }
        }, intervalForUpdate);
    });

}

export = (nodecg: NodeCG) => {
    setup(nodecg);
}