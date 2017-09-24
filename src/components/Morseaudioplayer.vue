<template>
  <section id="audioplayer">
    <header>
      <h3>Morse audio player</h3>
    </header>

    <label>
      Waveform
      <select name="type" v-model="waveform" @change="updateWaveform()">
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </label>

    <label>
      Wave frequency
      <input type="number" step="10" class="text-right" v-model="frequency" @change="updateFrequency()"> hz
    </label>

    <label>
      Dot duration
      <input type="number" step="10" class="text-right" v-model="dotduration" @change="updateDotDuration()"> ms
    </label>

    <button @click="play">Play morse signal</button>

    <label for="">
      Signal duration
      <input type="number" class="text-right" readonly v-bind:value="duration"> ms
    </label>

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

  .text-right {
    text-align: right;
  }
}
</style>
