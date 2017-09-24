<template>
  <section id="coder">
    <header>
      <h3>Text to morse</h3>
    </header>

    <div>
      <label for="input">Your text</label>
      <textarea name="input" v-model="shared.text"></textarea>
    </div>

    <div>
      <label for="output">Morse Output</label>
      <small>
        Characters are seperated by
        <input type="text" v-model="shared.charSpacer"> and words by
        <input type="text" v-model="shared.wordSpacer">. Unknown characters are replaced with
        <input type="text" v-model="shared.unknownChar">
      </small>
      <textarea name="output" v-bind:value="morse" readonly></textarea>
    </div>

  </section>
</template>

<script>
import text2morse from './../scripts/text2morse';
import store from './../scripts/store';

export default {
  name: 'morsetranslator',
  data() {
    return {
      shared: store.state,
    };
  },
  computed: {
    morse() {
      this.shared.morse = text2morse(
        this.shared.text,
        this.shared.charSpacer,
        this.shared.wordSpacer,
        this.shared.unknownChar,
      );
      return this.shared.morse;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
#coder {

  label {
    display: flex;
  }

  small {
    input {
      width: 1.5em;
      text-align: center;
      cursor: pointer;
    }
  }

  textarea {
    width: 100%;
    height: 100px;
    resize: none;
    margin: 1em 0 2em;
  }

  textarea,
  input {
    font-family: Courier New, Courier, monospace;
  }
}
</style>
