import "@riotjs/hot-reload";
import * as riot from "riot";
import SpeakerSimple from "./speaker-simple/speaker-simple.riot";

riot.component(SpeakerSimple)(
    document.getElementById('root') || document.body,
    {}
);