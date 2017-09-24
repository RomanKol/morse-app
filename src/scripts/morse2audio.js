class morse2audio {

  constructor(
    dot = 50,
    frequency = 440,
    waveform = 'sine',
    charSpacer = ' ',
    wordSpacer = '/',
    unkownChar = '#') {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.osc = this.ctx.createOscillator();
    this.gainNode = this.ctx.createGain();

    this.osc.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.osc.start(0);
    this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0);

    this.durations = {
      '·': 1,             // dit
      '−': 3,             // dah
      elementSpacer: 1,   // between dits/dahs
      charSpacer: 3,      // between 2 characters
      wordSpacer: 7,      // between 2 words
    };

    this.characters = {
      charSpacer,
      wordSpacer,
      unkownChar,
    };

    this.dotduration = dot;

    this.frequency = frequency;
    this.waveform = waveform;

    this.signal = '';
    this.tasks = [];
  }

  signal2tasks(signal) {
    const length = signal.length;
    const tasks = [];

    for (let index = 0; index < length; index += 1) {
      const task = [];

      task.push(this.durations[signal[index]]);
      // If signal end
      if (index + 1 === length) {
        task.push(1);
        // Next element is dit or dah
      } else if (signal[index + 1] === '·' || signal[index + 1] === '−') {
        task.push(1);
        // Next element is gap between two characters
      } else if (signal[index + 1] === this.characters.charSpacer) {
        task.push(3);
        index += 1;
        // Next ist gap between two words
      } else if (signal[index + 1] === this.characters.wordSpacer) {
        task.push(7);
        index += 1;
      } else {
        throw Error({
          msg: 'Error while parsing morse morse',
          error: `Unkown morse character ${signal[index + 1]}`,
        });
      }
      tasks.push(task);
    }
    return tasks;
  }

  play(index = 0) {
    if (index < this.tasks.length) {
      this.playing = true;
      this.gainNode.gain.setTargetAtTime(1, this.ctx.currentTime, 0.005);
      this.timeout = setTimeout(() => {
        this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.005);
        this.timeout = setTimeout(() => {
          this.play(index + 1);
        }, this.tasks[index][1] * (this.dotduration || 50));
      }, this.tasks[index][0] * (this.dotduration || 50));
    } else {
      this.playing = false;
    }
  }

  isPlaying() {
    return this.playing;
  }

  stop() {
    this.playing = false;
    clearTimeout(this.timeout);
    this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.005);
  }

  setSignal(signal) {
    this.signal = signal;
    this.tasks = this.signal2tasks(this.signal);
  }

  setSettings(options) {
    if (options.waveform) {
      this.waveform = options.waveform;
      this.osc.type = this.waveform;
    }
    if (options.frequency) {
      this.frequency = options.frequency;
      this.osc.frequency.setTargetAtTime(this.frequency, this.ctx.currentTime, 0);
    }
    if (options.dotduration) {
      this.dot = parseInt(options.dotduration, 10);
    }
  }

  setSpacer({ charSpacer, wordSpacer, unkownChar }) {
    this.characters.charSpacer = charSpacer;
    this.characters.wordSpacer = wordSpacer;
    this.characters.unkownChar = unkownChar;
  }

  setWaveform(waveform) {
    this.waveform = waveform;
    this.osc.type = this.waveform;
  }

  setFrequency(frequency) {
    this.frequency = frequency;
    this.osc.frequency.setTargetAtTime(this.frequency, this.ctx.currentTime, 0);
  }

  setDotduration(dotduration) {
    this.dotduration = parseInt(dotduration, 10);
  }

  getDuration(signal) {
    const tasks = this.signal2tasks(signal);
    return tasks.reduce((sum, task) => sum + ((task[0] + task[1]) * this.dotduration), 0);
  }
}

export default morse2audio;
