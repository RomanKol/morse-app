<template>
  <section id="audioplayer">
    <header>
      <h3>Morse audio player</h3>
    </header>

    <div class="options">
      <div>
        <label for="waveform">Waveform:</label>
        <select name="waveform" v-model="waveform" @change="updateWaveform()">
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>

      <div class="input-form">
        <label for="frequency">Signal wave frequency:</label>
        <div>
          <input type="number" step="10" name="frequency" class="text-right" v-model="frequency" @change="updateFrequency()">
          <span>hz</span>
        </div>
        <small>The wave frequency of the morse signal in herz</small>
      </div>

      <div class="input-form">
        <label for="dotduration">Dot duration:</label>
        <div>
          <input type="number" step="10" name="dotduration" class="text-right" v-model="dotduration" @change="updateDotDuration()">
          <span>ms</span>
        </div>
        <small>The duration of a single dot/dit sound in milliseconds</small>
      </div>

      <div class="input-form">
        <label for="duration">Signal duration:</label>
        <div>
          <input type="number" name="duration" class="text-right" readonly v-bind:value="duration">
          <span>ms</span>
        </div>
        <small>The duration the complete signal in milliseconds</small>
      </div>

    </div>

    <button @click="play">Play morse signal</button>

  </section>
</template>

<script>
import Morse2audio from './../scripts/morse2audio';
import store from './../scripts/store';

export default {
  name: 'audioplayer',
  data() {
    return {
      shared: store.state,
      waveform: 'square',
      frequency: 440,
      dotduration: 50,
      player: new Morse2audio(),
    };
  },
  computed: {
    duration() {
      return this.player.getDuration(this.shared.morse);
    },
  },
  methods: {
    play() {
      if (this.player.isPlaying()) {
        this.player.stop();
      } else {
        this.player.setSpacer({
          charSpacer: this.shared.charSpacer,
          wordSpacer: this.shared.wordSpacer,
          unkownChar: this.shared.unkownChar,
        });
        this.player.setSignal(this.shared.morse);
        this.player.play();
      }
    },
    updateDotDuration() {
      this.player.setDotduration(this.dotduration);
    },
    updateFrequency() {
      this.player.setFrequency(this.frequency);
    },
    updateWaveform() {
      this.player.setWaveform(this.waveform);
    },
  },
};
</script>

<style lang='scss'>
#audioplayer {

  .options {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: -0.5em;
    >div {
      flex: 1 1;
      background-color: #eee;
      padding: 1em;
      margin: 0.5em;
    }
  }

  select {
    padding: 0.5em 1em;
    width: 100%;
  }

  small {
    color: #666;
  }

  button {
    border: none;
    background-color: #ccc;
    padding: 1em 2em;
    margin: 1em 0;
    align-self: center;
    font-weight: bold;
    cursor: pointer;
    transition: all 333ms ease-in-out;
    &:hover {
      background-color: #bbb;
    }
  }

  .text-right {
    text-align: right;
  }
}
</style>
