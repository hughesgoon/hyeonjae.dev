import { useEffect, useState, useCallback } from 'react'
import qs from 'query-string'
import { TAG_TYPE } from '../constants'
import * as ScrollManager from '../utils/scroll'

export function useTag() {
  const [tag, setTag] = useState(TAG_TYPE.ALL)
  const selectTag = useCallback(tag => {
    setTag(tag)
    window.history.pushState(
      { tag },
      '',
      `${window.location.pathname}?${qs.stringify({ tag })}`
    )
  }, [])
  const changeTag = useCallback(() => {
    const { tag } = qs.parse(location.search)
    const target = tag == null ? TAG_TYPE.ALL : tag

    setTag(target)
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', changeTag)

    return () => {
      window.removeEventListener('popstate', changeTag)
    }
  }, [])

  useEffect(() => {
    changeTag()
  }, [])

  return [tag, selectTag]
}
