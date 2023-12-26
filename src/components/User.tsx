import { defineComponent, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCurrentUserStore } from '@/stores/currentUser'
import { localization } from '@/app/localization'
import Error from '@/components/Error'
import Loading from '@/components/Loading'

export default defineComponent({
  name: 'UserComponent',

  components: {
    RouterLink,
    Loading,
    Error
  },

  props: ['id'],

  setup(props) {
    const currentUserStore = useCurrentUserStore()
    const { currentUser, loading, error } = storeToRefs(currentUserStore)
    const { getCurrentUser } = currentUserStore
    const getUser = () => {
      const id = props.id
      return getCurrentUser(id)
    }

    onMounted(getUser)

    return { currentUser, loading, error, getUser }
  },

  render() {
    return (
      <>
        <RouterLink to={'/'}>{localization('goBackToTable')}</RouterLink>
        <p>{`${localization('user')} № ${this.id}`}</p>
        {this.loading ? (
          <Loading />
        ) : this.error ? (
          <>
            <Error text={this.error} />
            <button onClick={this.getUser}>{localization('tryAgain')}</button>
          </>
        ) : (
          <>
            {this.currentUser && Object.keys(this.currentUser).length ? (
              <>
                <p>{`${localization('name')}: ${this.currentUser.name}`}</p>
                <p>{`${localization('email')}: ${this.currentUser.email}`}</p>
                <p>{`${localization('website')}: ${this.currentUser.website}`}</p>
                <p>{`${localization('companyName')} : ${this.currentUser.company.name}`}</p>
                <p>{`${localization('city')}: ${this.currentUser.address.city}`}</p>
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
