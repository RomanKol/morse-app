<template>
  <section id="coder">
    <header>
      <h3>Text to morse</h3>
    </header>
    <div class="columns">
      <label for="input">Your text</label>
      <textarea name="input" v-model="text"></textarea>
    </div>
    <div class="columns">
      <label for="output">Morse Output</label>
      <small>
        Characters are seperated by
        <input type="text" v-model="charSeperator"> and words by
        <input type="text" v-model="wordSeperator">. Unknown characters are replaced with
        <input type="text" v-model="unknownChar">
      </small>
      <textarea name="output" v-bind:value="morse" readonly></textarea>
    </div>
  </section>
</template>

<script>
import text2morse from './../scripts/text2morse';

export default {
  name: 'morsetranslator',
  data() {
    return {
      text: '',
      morsetext: '',
      charSeperator: ' ',
      wordSeperator: '/',
      unknownChar: '#',
    };
  },
  computed: {
    morse() {
      return text2morse(
        this.text,
        this.charSeperator,
        this.wordSeperator,
        this.unknownChar,
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
#coder {

  small {
    input {
      width: 1.5em;
      text-align: center;
      cursor: pointer;
    }
  }

  textarea {
    width: 100%;
    height: 150px;
    resize: none;
    margin-bottom: 1em;
  }

  textarea,
  input {
    font-family: Courier New, Courier, monospace;
  }
}
</style>
