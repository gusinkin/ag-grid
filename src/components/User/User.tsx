import { defineComponent, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCurrentUserStore } from '@/stores/currentUser/currentUser'
import { localization } from '@/app/localization'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import styles from './styles.module.scss'

export default defineComponent({
  name: 'UserComponent',

  components: {
    RouterLink,
    Loading,
    Error
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const currentUserStore = useCurrentUserStore()
    currentUserStore.getCurrentUser(props.id)

    return { currentUserStore }
  },

  render() {
    return (
      <>
        <RouterLink to={'/'}>{localization('goBackToTable')}</RouterLink>
        <p>{`${localization('user')} № ${this.id}`}</p>
        {this.currentUserStore.loading ? (
          <Loading />
        ) : this.currentUserStore.error ? (
          <>
            <Error text={this.currentUserStore.error} />
            <button onClick={() => this.currentUserStore.getCurrentUser(this.id)}>{localization('tryAgain')}</button>
          </>
        ) : (
          <>
            {this.currentUserStore.currentUser && Object.keys(this.currentUserStore.currentUser).length ? (
              <>
                <p class={styles.name}>{`${localization('name')}: ${this.currentUserStore.currentUser.name}`}</p>
                <p class={styles.email}>{`${localization('email')}: ${this.currentUserStore.currentUser.email}`}</p>
                <p>{`${localization('website')}: ${this.currentUserStore.currentUser.website}`}</p>
                <p>{`${localization('companyName')} : ${this.currentUserStore.currentUser.company.name}`}</p>
                <p>{`${localization('city')}: ${this.currentUserStore.currentUser.address.city}`}</p>
              </>
            ) : (
              <Error text={localization('infoNotLoaded')} />
            )}
          </>
        )}
      </>
    )
  }
})
