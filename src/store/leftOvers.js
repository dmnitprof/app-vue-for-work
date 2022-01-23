import firebase from 'firebase/compat/app'

export default {
  actions: {
    async addPosition ({
      dispatch,
      commit
    }, {
      position
    }) {
      try {
        const addPos = await firebase.database().ref('/leftovers').push({
          position,
          oldTech: 0,
          newTech: 0,
          status: 'created',
          statusOldTech: true,
          statusNewTech: true,
          date: new Date().toLocaleDateString(),
          dateTime: new Date().toLocaleString(),
          dateTimeOldTech: new Date().toLocaleString(),
          dateTimeNewTech: new Date().toLocaleString(),
          dateOldTech: new Date().toLocaleDateString(),
          dateNewTech: new Date().toLocaleDateString()
        })
        return {
          position,
          id: addPos.key
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchLeftOvers ({ dispatch, commit }) {
      try {
        const records = (await firebase.database().ref('/leftovers').once('value')).val() || {}
        return Object.keys(records).map(key => ({
          ...records[key],
          id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateOldTech ({ dispatch, commit }, { id, value }) {
      console.log(value)
      try {
        await firebase.database().ref('/leftovers').child(id).update({
          oldTech: value,
          status: 'updated',
          statusOldTech: true,
          date: new Date().toLocaleDateString(),
          dateTime: new Date().toLocaleString(),
          dateTimeOldTech: new Date().toLocaleString(),
          dateOldTech: new Date().toLocaleDateString()
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateNewTech ({ dispatch, commit }, { id, value }) {
      console.log(value)
      try {
        await firebase.database().ref('/leftovers').child(id).update({
          newTech: value,
          status: 'updated',
          statusOldTech: true,
          date: new Date().toLocaleDateString(),
          dateTime: new Date().toLocaleString(),
          dateTimeNewTech: new Date().toLocaleString(),
          dateNewTech: new Date().toLocaleDateString()
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
