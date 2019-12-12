import { useState, useEffect } from 'react'
import { getData } from './../services'

export default function useLoadingEffect(uid) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData(uid).then(loadedData => {
      setData(loadedData)
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading }
}
