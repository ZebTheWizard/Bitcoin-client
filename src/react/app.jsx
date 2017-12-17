import React from 'react'
import ReactDOM from 'react-dom'
import Note from './Note'

// this is imported from src/react/example.jsx
const note = <Note />

ReactDOM.render(
  note,
  document.getElementById('app')
)
