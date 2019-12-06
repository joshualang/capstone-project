import { useState, useEffect } from 'react'
import { getData } from './../services'

export default function useLoadingEffect() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData().then(loadedData => {
      setData(loadedData)
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading }
}
