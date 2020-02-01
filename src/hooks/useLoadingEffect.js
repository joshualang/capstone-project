import { useState, useEffect } from 'react'
import { getUser, getProfile } from './../services'

export default function useLoadingEffect(user, lastRefresh) {
  const [data, setData] = useState({})
  const [profiles, setProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getUser(user.uid, user._lat).then(loadedData => {
      setProfiles(loadedData.user.profiles)
      getProfile(loadedData.user.profiles[0]._id, user._lat).then(result => {
        setData(result.profile)
        setIsLoading(false)
      })
    })
  }, [lastRefresh])
  return { data, profiles, isLoading }
}
