import firebase from 'firebase/compat/app'

export default {
  actions: {
    async addRecord ({
      dispatch,
      commit
    }, {
      title,
      text
    }) {
      try {
        const uid = await dispatch('getUid')
        const record = await firebase.database().ref(`/users/${uid}/records`).push({
          title,
          text,
          status: 'создано',
          dateTime: new Date().toLocaleString(),
          date: new Date().toLocaleDateString()
        })
        return {
          title,
          text,
          id: record.key
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords ({
      dispatch,
      commit
    }) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        return Object.keys(records).map(key => ({
          ...records[key],
          id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async removeRecord ({
      dispatch,
      commit
    }, id) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/records`).child(id).set(null)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateRecord ({
      dispatch,
      commit
    }, {
      text,
      id
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/records`).child(id).update({
          text,
          status: 'обновлено',
          dateTime: new Date().toLocaleString(),
          date: new Date().toLocaleDateString()
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
