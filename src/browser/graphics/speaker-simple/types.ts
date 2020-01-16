import { RiotComponentExport } from "riot";
import { Speakers } from '../../../nodecg/replicants';

// Props of this component
export interface Props {}

// State of this component
export interface State {
  speakers: Speakers;
}

// Interface of this component
export interface SpeakerSimpleComponent extends RiotComponentExport<Props, State> {
  state: State;
}
