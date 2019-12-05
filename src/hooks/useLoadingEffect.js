import React, { useState, useEffect } from 'react'
import { getData } from './../services'
import defaultData from './../empty.json'

export default function useLoadingEffect() {
  const [data, setData] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData().then(loadedData => {
      setData(loadedData)
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading }
}
