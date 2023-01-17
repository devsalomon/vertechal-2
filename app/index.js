import * as util from "../common/utils";

clock.ontick = (evt) => {
  util.updateBattery();
  util.updateSteps();
  util.updateTime(evt)
}
