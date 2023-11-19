<template>
  <div class="setting-container" v-cloak>
    <div class="page-title">
      <h3>Настройки</h3>
    </div>

    <h5 class="settings-subtitle">Дата и время</h5>
    <div class="row">

      <!--   Format time   -->
      <div class="input-field col s3">
        <select v-model="selectFormatDate" @change="updateFormatDate">
          <option ref="optionFormatDate" value="" disabled selected></option>
          <option
              v-for="format in formats"
              :key="format.formatCode"
              :value="format.formatCode">{{ convertDate(format.formatCode) }}
          </option>
        </select>
        <label>Формат даты</label>
      </div>

      <!--   Time zone   -->
      <div class="input-field col s3">
        <select>
          <option ref="optionTimezoneDate" value="" disabled selected></option>
          <option
              v-for="timezone in timezones"
              :key="timezones.zone"
              :value="timezone.zone">{{ timezone.name }}
          </option>
        </select>
        <label>Часовые пояса</label>
      </div>
    </div>
  </div>
</template>

<script>
import {DateTime, Settings} from 'luxon'
import {Database} from "../data/Database.js";

export default {
  name: "Settings",
  data: () => ({
    now: null,
    format: null,
    locale: null,
    timezone: null,
    selects: null,
    selectFormatDate: null,
    test: 'test',
    timezones: [
      {zone: "UTC-12", name: "UTC-12: Международная линия перемены даты (IDL)"},
      {zone: "UTC-11", name: "UTC-11: Ниуэ, Самоа"},
      {zone: "UTC-10", name: "UTC-10: Гавайи, Алеутские острова"},
      {zone: "UTC-9", name: "UTC-9: Аляска"},
      {zone: "UTC-8", name: "UTC-8: Тихоокеанское время (США и Канада)"},
      {zone: "UTC-7", name: "UTC-7: Горное время (США и Канада)"},
      {zone: "UTC-6", name: "UTC-6: Центральное время (США и Канада), Мехико"},
      {zone: "UTC-5", name: "UTC-5: Восточное время (США и Канада), Богота, Лима"},
      {zone: "UTC-4", name: "UTC-4: Атлантическое время (Канада), Каракас"},
      {zone: "UTC-3", name: "UTC-3: Буэнос-Айрес, Чили"},
      {zone: "UTC-2", name: "UTC-2: Среднеатлантическое время"},
      {zone: "UTC-1", name: "UTC-1: Азорские острова, Кабо-Верде"},
      {zone: "UTC", name: "UTC: Западноевропейское время, Лондон, Лиссабон"},
      {zone: "UTC+1", name: "UTC+1: Центральноевропейское время, Берлин, Рим"},
      {zone: "UTC+2", name: "UTC+2: Восточноевропейское время, Афины, Иерусалим"},
      {zone: "UTC+3", name: "UTC+3: Московское время, Багдад"},
      {zone: "UTC+4", name: "UTC+4: Самарское время, Баку, Тбилиси"},
      {zone: "UTC+5", name: "UTC+5: Екатеринбургское время, Исламабад, Карачи"},
      {zone: "UTC+6", name: "UTC+6: Омское время, Алматы"},
      {zone: "UTC+7", name: "UTC+7: Красноярское время, Бангкок"},
      {zone: "UTC+8", name: "UTC+8: Иркутское время, Пекин"},
      {zone: "UTC+9", name: "UTC+9: Якутское время, Токио"},
      {zone: "UTC+10", name: "UTC+10: Владивостокское время, Сидней"},
      {zone: "UTC+11", name: "UTC+11: Соломоновы острова, Магадан"},
      {zone: "UTC+12", name: "UTC+12: Фиджи, Камчатка"},
    ],
    formats: [
      {
        formatCode: 'dd MM',
      },
      {
        formatCode: 'dd MM yyyy',
      },
      {
        formatCode: 'dd MM yy',
      },
      {
        formatCode: 'MM dd yyyy',
      },
      {
        formatCode: 'MM dd yy'
      },
      {
        formatCode: 'dd.MM',
      },
      {
        formatCode: 'dd.MM.yyyy',
      },
      {
        formatCode: 'dd.MM.yy',
      },
      {
        formatCode: 'MM.dd.yyyy',
      },
      {
        formatCode: 'MM.dd.yy',
      },
      {
        formatCode: 'dd-MM',
      },
      {
        formatCode: 'dd-MM-yyyy',
      },
      {
        formatCode: 'dd-MM-yy',
      },
      {
        formatCode: 'MM-dd-yyyy',
      },
      {
        formatCode: 'MM-dd-yy',
      },
      {
        formatCode: 'dd/MM',
      },
      {
        formatCode: 'dd/MM/yyyy',
      },
      {
        formatCode: 'dd/MM/yy',
      },
      {
        formatCode: 'MM/dd/yyyy',
      },
      {
        formatCode: 'MM/dd/yy',
      },
      {
        formatCode: 'd LLL yyyy',
      },
      {
        formatCode: 'd LLL',
      },
      {
        formatCode: 'LLL d yyyy',
      },
      {
        formatCode: 'LLL d',
      },
      {
        formatCode: 'd LLLL yyyy',
      },
      {
        formatCode: 'd LLLL',
      },
      {
        formatCode: 'LLLL d yyyy',
      },
      {
        formatCode: 'LLLL d',
      },
      {
        formatCode: 'd LLL yy',
      },
      {
        formatCode: 'LLL d yy',
      },
      {
        formatCode: 'd LLLL yy',
      },
      {
        formatCode: 'LLLL d yy',
      },
    ]
  }),
  async mounted() {
    this.format = await Database.getFormat()
    this.timezone = await Database.getTimezone()
    this.locale = await Database.getLocale()
    this.now = await DateTime.local().setZone(this.timezone).toFormat(this.format + "")

    this.$refs.optionFormatDate.textContent = this.now
    this.$refs.optionTimezoneDate.textContent = this.timezone

    this.selects = document.querySelectorAll('select')
    this.selects.forEach(elem => M.FormSelect.init(elem))
  },
  methods: {
    convertDate(format) {
      Settings.defaultLocale = this.locale
      return DateTime.local().setZone(this.timezone).toFormat(format)
    },
    async updateFormatDate() {
      await Database.setFormat(this.selectFormatDate)
      this.now = await Database.getNow()
      this.$emit('updateDate', this.now)
    }
  }
}
</script>

<style scoped>
.settings-subtitle {
  margin-bottom: 15px;
}
</style>