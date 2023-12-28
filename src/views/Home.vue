<template>

  <div id="modal" class="modal">
    <div class="modal-content">
      <h4>Добавить валюту</h4>
      <table>
        <thead>
        <tr>
          <th>
            <p>
              <label>
                <input type="checkbox" class="filled-in"/>
                <span></span>
              </label>
            </p>
          </th>
          <th>Валюта</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <p>
              <label>
                <input type="checkbox" class="filled-in"/>
                <span></span>
              </label>
            </p>
          </td>
          <td>USD</td>
        </tr>
        <tr>
          <td>
            <p>
              <label>
                <input type="checkbox" class="filled-in"/>
                <span></span>
              </label>
            </p>
          </td>
          <td>USD</td>
        </tr>
        <tr>
          <td>
            <p>
              <label>
                <input type="checkbox" class="filled-in"/>
                <span></span>
              </label>
            </p>
          </td>
          <td>USD</td>
        </tr>
        <tr>
          <td>
            <p>
              <label>
                <input type="checkbox" class="filled-in"/>
                <span></span>
              </label>
            </p>
          </td>
          <td>USD</td>
        </tr>
        <tr>
          <td>
            <p>
              <label>
                <input type="checkbox" class="filled-in"/>
                <span></span>
              </label>
            </p>
          </td>
          <td>USD</td>
        </tr>
        <tr>
          <td>
            <p>
              <label>
                <input type="checkbox" class="filled-in"/>
                <span></span>
              </label>
            </p>
          </td>
          <td>USD</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>

  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <div class="flex gap-1">
        <button
            class="waves-effect white-text waves-light btn">
          <i class="material-icons">refresh</i>
        </button>
        <button
            class="waves-effect white-text waves-light btn"
            @click.prevent="openModalCurrency">
          <i class="material-icons">add</i>
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">Счет в валюте</span>
            <input
                ref="bill"
                :value="bill"
                class="input-bill custom-bill"
                @onclick.prevent="editBill"
            />
            <span class="text">Нажмите на цифры, чтобы изменить</span>
          </div>
        </div>
      </div>

      <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Курс валют</span>
            </div>
            <table>
              <thead>
              <tr>
                <th>Счет</th>
                <th>Валюта</th>
                <th>Дата</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="current in this.currencies">
                <td>$ {{ current.rate * bill }}</td>
                <td>{{ current.currency }}</td>
                <td>{{ current.date.split('-').reverse().join('.') }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Rates} from "../scripts/Rates.js"
import {Database} from "../data/Database.js"

export default {
  title: "Home",
  data: () => ({
    bill: null,
    usd: null,
    currencies: null,
    modal: null
  }),
  async mounted() {
    this.bill = (await Database.getActiveUser()).bill
    this.usd = await Rates.getCurrency("USD")
    this.currencies = (await Database.getActiveUser()).rates
    this.modal = M.Modal.init(document.querySelector('#modal'))
    console.log(await Rates.getJSON())
  },
  methods: {
    editBill() {

    },
    openModalCurrency() {
      this.modal.open()
    }
  }
}
</script>
<style scoped>
.custom-bill {
  font-size: 24px;
}
</style>