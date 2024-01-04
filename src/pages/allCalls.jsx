import React, { useEffect, useState } from 'react'

import CallItemCard from '../components/callItem.jsx';
import moment from 'moment';


// const CallCard = React.lazy(() => import('../components/callItem.jsx'));

const allCalls = () => {
  const [data,setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  
   useEffect(() => {
    fetch('https://cerulean-marlin-wig.cyclic.app/activities')
    .then((res) => res.json())
    .then((apiData) => {
        setLoading(false);
        setData(apiData);
    })
    .catch((err) => {
      console.log(`error in API ${err}`)
    }
    ) 
   }, [])
   
  console.log(data);
  // Group data by date
  const groupedData = data.reduce((acc, item) => {
    const dateKey = item.created_at;
    let date = new Date(dateKey);
    let formattedDate = date.toISOString().split('T')[0];
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(item);
    return acc;
  }, {});

  const groupedArray = Object.entries(groupedData).map(([date, items]) => ({
    date,
    items,
  }));

  console.log("groupedArray",groupedArray);

  return (
    <div className='h-100 p-2 overflow-auto overflow-x-hidden'>
       {loading ? <div className='loading-window'>
        Loading...
      </div> :
        <div>
      {groupedArray.map(({ date, items }) => (
        <div key={date}>
          <h6>{date}</h6>
            {items.map((data) => (
              <CallItemCard key={data.id} callId={data.id} callType={data.direction} callerName={data.to} callerMeta={data.via} callerTime={moment(data.created_at).format('hh:mm A')} />
            ))}
        </div>
      ))}
      </div>
      }
 </div>
  );
};

export default allCalls;