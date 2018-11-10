const clock = new Vue({
    el: '#app',
    //=====================
    data: {
        timerRunning: null,
        title: "My Pomodoro Clock",
        time: 25 * 60,
        extraButtons: false,
        type: 'pomodoro',
        doneAudio: new Audio('chime.mp3')
    },

    methods: {
        //Default time of 25 
        setTime: function() {
            if (this.type === 'pomodoro') {
                val = 25
            } else if (this.type == 'long') {
                val = 10
            } else {
                val = 5 
            }
            this.time = val * 60
        },
        setType: function(){
            this.type = event.target.value
            this.reset()
            this.setTime()
        },

        //start clock
        start: function(){
            this.extraButtons = true
            this.timerRunning = setInterval(() => this.countdown(), 1000)
        },

        pause: function(){
            clearInterval(this.timerRunning);
            this.timerRunning = null

        },
        // reset clock
        reset: function(){
            clearInterval(this.timerRunning);
            this.timerRunning = null
            this.extraButtons = false
            this.setTime()
        },

        //countdown the time until you get to 0 then reset
        countdown: function(){
            if (this.time > 0){
                this.time-- 
            } else {
                this.doneAudio.play()
                this.reset()
            }
        },

        //Pad time with zeros if single digit number (less than 10)
        padZero: function(time) {
            return (time < 10 ? '0': '') + time
        },
    },
    computed: {
        timeString: function(){
            const minutes = this.padZero(Math.floor(this.time / 60))
            const seconds = this.padZero(this.time % 60)
            return `${minutes}:${seconds}`
        }
    }
})