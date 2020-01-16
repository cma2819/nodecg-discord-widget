import { Speakers } from "./generated/speakers";
import { Status } from "./generated/status";

type ReplicantMap = {
    speakers: Speakers;
    status: Status;
};

export {
    ReplicantMap,
    Speakers,
    Status
};