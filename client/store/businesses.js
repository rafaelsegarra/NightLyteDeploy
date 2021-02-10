import axios from 'axios'

const SET_BUSINESSES = 'SET_BUSINESSES'

const setBusinesses = businesses => ({type: SET_BUSINESSES, businesses})

export const getBusinessesFromApi = (
  locationSearched,
  hour
) => async dispatch => {
  try {
    const {data} = await axios.get(
      `${'https://corsanywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${locationSearched}`,
      {
        headers: {
          accept: 'application/json',
          'x-requested-with': 'xmlhttprequest',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer d7me82kfWORLA8U70CIdJzgNKTCzhv-aHEjhB7KNtggEeusVZublUF0AhHlaWsNhzoIfv9KJRPUy7wsK4KglKy2_7BRwVoG1UaRfpEBIz-rjnGM04210jy0hXj0YYHYx`
        },
        params: {
          limit: 50,
          open_at: hour
        }
      }
    )

    dispatch(setBusinesses(data.businesses))
  } catch (err) {
    console.error('error in setBusinesses thunk', err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_BUSINESSES:
      return action.businesses
    default:
      return state
  }
}
