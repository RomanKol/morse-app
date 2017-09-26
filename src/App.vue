<template>
  <div id="app">
    <header>
      <h2>Morse-translator</h2>
      <p>App to translate text to morse code</p>
    </header>
    <main>
      <morsetranslator></morsetranslator>
      <morseaudioplayer></morseaudioplayer>
      <morsecheatsheet></morsecheatsheet>
    </main>
  </div>
</template>

<script>
import Morsetranslator from './components/Morsetranslator';
import Morsecheatsheet from './components/Morsecheatsheet';
import Morseaudioplayer from './components/Morseaudioplayer';

export default {
  name: 'app',
  components: {
    Morsetranslator,
    Morsecheatsheet,
    Morseaudioplayer,
  },
};
</script>

<style lang='scss'>
@import 'styles/index';

#app {

  background-color: #ffffff;
  color: #212121;
  display: flex;

  margin: 4em auto 2em;
  flex-direction: column;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.24);

  >header {
    width: 100%;
    background-color: #78909c;
    padding: 1em;
  }

  main>* {
    padding: 1em;
    border-bottom: 1px solid #eee;
  }

  @media (min-width: 576px) {
    width: 540px;
  }

  @media (min-width: 768px) {
    width: 720px;
  }

  @media (min-width: 992px) {
    width: 960px;
  }
}
</style>
