<template>
  <section id="cheatsheet">
    <header>
      <h3>Morse code cheatsheet</h3>
    </header>

    <div class="filters">
      <div class="input-form">
        <label for="search">Text search:</label>
        <input type="text" name="search" v-model="search">
      </div>

      <div class="input-form">
        <label for="category">Category filter:</label>
        <select name="category" v-model="category">
          <option value="">All</option>
          <option v-for="category in categories" v-bind:value='category'>{{ category }}</option>
        </select>
      </div>
    </div>

    <div class="wrapper">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Character</th>
            <th>Morse Code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in morseCode">
            <td>{{ item.category }}</td>
            <td>
              {{ item.character }}
              <small v-if="item.description"> {{ item.description }}</small>
            </td>
            <td>{{ item.code }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </section>
</template>

<script>
import morse from './../scripts/morse.json';

function filterMorseItem(item, search, category) {
  const charCon = item.character.includes(search);
  const descrCon = item.description && item.description.includes(search);
  if (category === '') {
    return charCon || descrCon;
  }
  const catCon = item.category === category;
  return catCon && (charCon || descrCon);
}

export default {
  name: 'cheatsheet',
  data() {
    return {
      category: '',
      search: '',
    };
  },
  computed: {
    morseCode() {
      const search = this.search.toLowerCase();

      return morse.filter(item => filterMorseItem(item, search, this.category));
    },
    categories() {
      return Array.from(new Set(morse.map(item => item.category)));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
#cheatsheet {

  display: flex;
  flex-direction: column;

  .filters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: -0.5em -0.5em 1em -0.5em;
    >div {
      flex: 1 1;
      background-color: #eee;
      padding: 1em;
      margin: 0.5em;
    }
  }

  select {
    padding: 0.5em 1em;
    border: 1px solid #ddd
  }

  .wrapper {
    display: block;
    height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  table {
    list-style-type: none;
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 0.5em;
      text-align: left;
      border: 1px solid #ccc;
    }

    tbody {
      tr:nth-child(odd) {
        background: #eee;
      }
    }
  }
}
</style>
