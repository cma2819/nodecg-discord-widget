import { CreateNodecgInstance } from "ts-nodecg/server";
import { Configschema } from "../nodecg/generated/configschema";
import { ReplicantMap } from "../nodecg/replicants";
import { MessageMap } from "../nodecg/messages";

export type NodeCG = CreateNodecgInstance<
  "nodecg-discord-widget",
  Configschema,
  ReplicantMap,
  MessageMap
>;
