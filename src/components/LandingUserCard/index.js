import React, { useState, useEffect } from 'react'

export default function LandingUserCard (props) {
  const [users, setUsers] = useState([])
  useEffect(() => {}, [])
  return (
    <>
      <p>{props.name}</p>
    </>
  )
}
