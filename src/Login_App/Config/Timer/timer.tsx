
class Timer {
    session_details :any = {
        startTime: 0,
        currentTime: 0,
        upTime: 0
    };
    running: boolean = false;
    alarm: boolean = false;
    using_alarm: boolean = true;
    alarm_frequency: number = 60;
    constructor(){

    };
    get_upTime() {
        return this.session_details.upTime;
    };
    get_currentTime() {
        return this.session_details.currentTime;
    }
    get_alarm() {
        return this.alarm
    }
    toggle_alarm() {
        this.alarm === true ? this.alarm = false : this.alarm = true
    }
    async start_timer() {
        this.reset_timer();
        this.running = true;
        while (this.running){
            if (!this.running){
                break;
            }
            if (this.using_alarm) {
                if (this.session_details.upTime % this.alarm_frequency === 0 && this.session_details.upTime !== 0){
                    this.alarm = true
                }
            }
            this.session_details.currentTime += 1;
            this.session_details.upTime += 1;
            await this.sleep(1000);
        }
    };
    reset_timer(){
        this.session_details.startTime = Math.floor(Date.now()/1000);
        this.session_details.currentTime = this.session_details.startTime;
    };
    stop_timer() {
        this.running = false;
    };
    sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    print_timer() {
        console.log(`Current Time: ${this.session_details.currentTime}\nUp Time: ${this.session_details.upTime} seconds`);
    }
};

export default Timer;
