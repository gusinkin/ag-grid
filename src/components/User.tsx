import { defineComponent, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCurrentUserStore } from '@/stores/currentUser'

export default defineComponent({
  name: 'UserComponent',

  components: {
    RouterLink
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
        <RouterLink to={'/'}>назад к таблице</RouterLink>
        <p>это юзер № {this.id}</p>
        {this.loading ? (
          <p>loading...</p>
        ) : this.error ? (
          <>
            <p>{this.error}</p>
            <button onClick={this.getUser}>попробовать еще раз</button>
          </>
        ) : (
          <>
            {this.currentUser ? (
              <>
                <p>{`name: ${this.currentUser.name}`}</p>
                <p>{`email: ${this.currentUser.email}`}</p>
                <p>{`website: ${this.currentUser.website}`}</p>
                <p>{`company name: ${this.currentUser.company.name}`}</p>
                <p>{`city: ${this.currentUser.address.city}`}</p>
              </>
            ) : (
              <p>информация потерялась(</p>
            )}
          </>
        )}
      </>
    )
  }
})
