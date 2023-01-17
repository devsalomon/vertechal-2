import document from "document";
import { battery } from "power";
import { me as appbit } from "appbit";           // request permission for goals
import { today, goals } from "user-activity";    // goals interface
import { preferences } from "user-settings";
import * as datetime_util from "./timedate-utils";

export function updateBattery()
{
    console.log("Updating battery...");

    let percent_label = document.getElementById("battery-percentage");
    let percent_val = Math.floor(battery.chargeLevel); 

    percent_label.text = percent_val + '%';
    
    let battery_block;
    let active_blocks = Math.floor(percent_val / 2) - 1;

    console.log(active_blocks);
    for(let i = 49; i >= 0; i--)
    {
        battery_block = document.getElementById("battery-block-" + i);
        if (i > active_blocks){
            battery_block.style.opacity = 0.3;
        }
    }
}

export function updateSteps()
{
    console.log("Updating steps...");

    let goal_label = document.getElementById("goal-text");
    let step_bar = document.getElementById("step-bar");
    
    let VERTICAL_PX = 336;
    let STEP_BAR_PX = VERTICAL_PX - 34;  // 34px(goal text)

    let step_goal = 0;
    let current_steps = 0;
    let bar_height = 0;
    let goal_text = 0;
    
    if (appbit.permissions.granted("access_activity"))
    {
        step_goal = goals.steps;
        current_steps = today.adjusted.steps;
        console.log(step_goal);
        console.log(current_steps);
        
        if (current_steps < step_goal){
            bar_height = (STEP_BAR_PX / step_goal) * current_steps;
        }
        else{   
            // double values to reset a new goal
            step_goal *= 2;
            current_steps *= 2;
            
            let step_overflow = current_steps - step_goal;
            bar_height = step_overflow * (STEP_BAR_PX / step_goal);  
        }
    }
    else{
        console.log("User activity not accessible!");
    }
    
    // add 'k' only if steps > 1000
    goal_text  = step_goal < 1000? step_goal: (step_goal/1000) + 'k';  

    goal_label.text = goal_text;
    step_bar.height = bar_height;
    step_bar.y = VERTICAL_PX - bar_height;

}

export function updateTime(evt)
{
  console.log("Updating time and date...");

  datetime_util.setTime(preferences.clockDisplay, evt);
  datetime_util.setDate(evt);
}

