export default class Time {
    // proprieté de classe 

    /** @type {Pahser.Scene} */
    scene

    /** @type {Pahser.GameObject.Text}/
    label
 
    /** @type {Pahser.Time.TimeEvent}/
    timerEvent
 
    duration = 0
 
    /**
     * @param {Pahser.Scene} scene
     * @param {Pahser.GameObject.Text} label
    */

    constructor(scene, label) {

        this.scene = scene
        this.label = label
    }

    /**
    * @param {() => void} callback
    * @param {number} duration
    */

    start(callback, duration = 45000) {

        this.stop()

        this.finishedCallback = callback
        this.duration = duration

        this.timerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.label.text = '0'
                this.stop()

                if (callback) {

                    callback()
                }
            }
        })
    }

    stop() {

        if (this.timerEvent) {

            this.timerEvent.destroy()
            this.timerEvent = undefined
        }
    }

    update() {

        if (!this.timerEvent || this.duration <= 0) {
            return
        }
        const elapsed = this.timerEvent.getElpsed()
        const remaining = this.duration - elapsed
        const seconde = remaining / 1000

        this.label.text = seconde.toFixed(2)
    }
}