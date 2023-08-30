import {Component} from 'react'

import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'

import './index.css'

import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    activeOptionId: transactionTypeOptions[0].optionId,
    expenses: 0,
    income: 0,
    transactionsList: [],
  }

  onDelete = id => {
    const {transactionsList} = this.state
    const filteredList = transactionsList.filter(each => each.id !== id)
    this.setState({transactionsList: filteredList})
    const filteredList1 = transactionsList.filter(each => each.id === id)
    if (filteredList1[0].type === transactionTypeOptions[0].displayText) {
      this.setState(prevState => ({
        income: prevState.income - filteredList1[0].amount,
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses - filteredList1[0].amount,
      }))
    }
  }

  onChanging = event => {
    this.setState({activeOptionId: event.target.value})
  }

  onChangingTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangingAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {activeOptionId, amountInput, titleInput} = this.state
    const typedisplay = transactionTypeOptions.find(
      each => each.optionId === activeOptionId,
    )
    const {displayText} = typedisplay
    const transactionItem = {
      id: v4(),
      title: titleInput,
      amount: amountInput,
      type: displayText,
    }

    if (activeOptionId === transactionTypeOptions[0].optionId) {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amountInput),
        transactionsList: [...prevState.transactionsList, transactionItem],
        titleInput: '',
        amountInput: '',
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amountInput),
        transactionsList: [...prevState.transactionsList, transactionItem],
        titleInput: '',
        amountInput: '',
        activeOptionId: transactionTypeOptions[0].optionId,
      }))
    }
  }

  render() {
    const {
      titleInput,
      amountInput,
      activeOptionId,
      expenses,
      income,
      transactionsList,
    } = this.state
    return (
      <div>
        <div>
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span className="spanele">Money Manager</span>
          </p>
        </div>
        <MoneyDetails income={income} expenses={expenses} />
        <h1>Add Transaction</h1>
        <form onSubmit={this.onAdd}>
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            id="title"
            value={titleInput}
            placeholder="Title"
            onChange={this.onChangingTitle}
          />
          <br />
          <label htmlFor="amount">AMOUNT</label>
          <input
            type="text"
            id="amount"
            value={amountInput}
            placeholder="Amount"
            onChange={this.onChangingAmount}
          />
          <br />
          <label htmlFor="type">TYPE</label>
          <select id="type" value={activeOptionId} onChange={this.onChanging}>
            {transactionTypeOptions.map(each => (
              <option key={each.optionId} value={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
        <ul className="listEle">
          <li className="item">
            <p>Title</p>
            <p>Amount</p>
            <p>Type</p>
          </li>
          <h1>History</h1>
          {transactionsList.map(each => (
            <TransactionItem
              details={each}
              key={each.id}
              onDelete={this.onDelete}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default MoneyManager

