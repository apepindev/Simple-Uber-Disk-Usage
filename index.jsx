import { css } from 'uebersicht';

// Root node CSS
export const className = css`
  min-width: 150px;

  top:    32px;
  bottom: 0;
  right:  3%;

  font-family:     'SFNS Display', 'Helvetica Neue', sans-serif;
  font-smoothing:  antialiased;
  color:           white;
  font-size:       32px;
  font-weight:     bold;
  letter-spacing:  0.025em;
  line-height:     .9em;

  text-align:      right;
  text-transform:  uppercase;

  opacity: 0.5;
`;

const iconCss = css`
  background: url('/hddspace.widget/PNG/hdd-32.png');
  -webkit-filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, .4));
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, .4));
`;

const bgCss = css`
  height: 40px;
  width: 50px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 32px 32px;
  margin-right: 8px;
`;

const diskCapacityCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const diskRowCss = css`
  margin-bottom: 32px;
`;

const nameCss = css`
  font-size: 11px;
  line-height: 18px;
`;

export const command = `{ df -Hl; diskutil list; } | grep "disk\\ds"`;

export const refreshFrequency = (1000 * 5); // 5 seconds

export const render = ({ output, error }) => {
  if (error || !output) {
    return <span>{error || null}</span>
  }
  const lines = output.split('\n').filter(Boolean);
  const drives = {};
  for (let i = 0; i < lines.length; i++) {
    const tokens = lines[i].split(/  +/).filter(Boolean);
    if (!tokens.length) continue;
    if (tokens[0][0] === '/') {
      const [diskId, size, used, avail, capacity] = tokens;
      drives[diskId.split('/').pop()] = { name: '', capacity };
    } else {
      const diskId = tokens[tokens.length - 1];
      if (drives[diskId]) {
        drives[diskId].name = tokens[1].substring(tokens[1].indexOf(' ') + 1);
      }
    }
  }
  return (
    <div id="content">
      {Object.values(drives).map(({ capacity, name }) => {
        return (
          <div key={name} className={diskRowCss}>
            <div className={diskCapacityCss}>
              <div className={`${iconCss} ${bgCss}`}></div>
              <div>{capacity}</div>
            </div>
            <div className={nameCss}>{name}</div>
          </div>
        );
      })}
    </div>
  );
};
