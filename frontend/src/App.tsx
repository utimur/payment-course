function App() {

    const onClick = () => {
        fetch('https://ravishingly-potential-hornbill.cloudpub.ru/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: '10.00',
                orderId: 'orderId',
                userId: 'userId',
            }),
        }).then(res => res.json())
            .then(data => {
                // navigate()
                console.log(data)
                window.open(data?.payment?.confirmation?.confirmation_url)
            })
    }

  return (
    <div>
      <button onClick={onClick}>ОПЛАТИТЬ!!!!</button>
    </div>
  )
}

export default App
