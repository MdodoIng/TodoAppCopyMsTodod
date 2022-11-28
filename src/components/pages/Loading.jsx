
import ReactLoading from 'react-loading';

const Loading = () => (
  <div style={{ width:'100%', height: '100vh', display:'flex', alignItems:'center', justifyContent: 'center'}}>

    <ReactLoading className='flex' type={'spin'} color='#2564cf' height={150} width=""/>
  </div>
);

export default Loading;
