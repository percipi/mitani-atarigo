import './AtariGo.css';

function AtariGo() {
  const getLineStyle = (i) => ({
    top: (i + 1) * 10 + '%',
    left: '10%'
  });

  const line = new Array(9).fill(null).map((a, i) => <div className="line" style={getLineStyle(i)}></div>);

  return (
    <div className="board">
      {line}
    </div>
  )
}

export {AtariGo};