import React from 'react'

class Note extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notes: [],
      name: '',
      content: ''
    }
  }

  componentDidMount () {
    fetch('http://localhost:8000/api/note/fetch')
      .then(response => response.json())
      .then(({data}) => this.setState({notes: data}))
  }

  createNote () {
    fetch('http://localhost:8000/api/note/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        content: this.state.content
      })
    })
      .then(response => response.json())
      .then(({data}) => this.setState({notes: [...this.state.notes, data]}))
  }

  model (prop, e) {
    let tmp = {}
    tmp[prop] = e.target.value
    this.setState(tmp)
  }

  render () {
    let noteHTML = this.state.notes.map(note => {
      return (
        <div className="note" key={note.uid}>
          <div className="name">{note.name}</div>
          <div className="content">{note.content}</div>
        </div>
      )
    })
    return (
      <div className="notes">
        {noteHTML}
        <input type="text" value={this.state.name} onChange={this.model.bind(this, 'name')} placeholder="name"/>
        <input type="text" value={this.state.content} onChange={this.model.bind(this, 'content')} placeholder="content"/>
        <button onClick={this.createNote.bind(this)} disabled={!this.state.name || !this.state.content}>New Note</button>
      </div>
    )
  }
}

export default Note
