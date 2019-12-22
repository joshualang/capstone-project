import { useState, useEffect } from 'react'
import { getData } from './../services'

export default function useLoadingEffect(user, lastRefresh) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData(user.uid, user._lat).then(loadedData => {
      setData(loadedData)
      setIsLoading(false)
    })
  }, [lastRefresh])

  return { data, isLoading }
}
