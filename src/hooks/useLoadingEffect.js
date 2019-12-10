import { useState, useEffect } from 'react'
import { getData } from './../services'

export default function useLoadingEffect(effect) {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData().then(loadedData => {
      setData(loadedData)
      setIsLoading(false)
    })
  }, [effect])

  return { data, isLoading }
}
