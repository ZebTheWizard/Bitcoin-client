import React from 'react'
import ReactDOM from 'react-dom'
import Example from './example'

// this is imported from src/react/example.jsx
const example = <Example name="John" />

ReactDOM.render(
  example,
  document.getElementById('app')
)
