import { useState, useEffect } from 'react'
import { getData } from './../services'

export default function useLoadingEffect(user) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData(user.uid, user._lat).then(loadedData => {
      setData(loadedData)
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading }
}
