import React, { useState, useEffect } from 'react';

const calculatePositionStrengths = async (players) => {
  let data = {
    totalTradeValue: 0,

  };
  players.map(player => {
    if (typeof player.tradeStats === "object") {
      data.totalTradeValue += parseFloat(player.tradeStats.TradeValue)
    }
  })

  console.log('Analysis', data, players)
}
/**
 * Trade values
 * Depth chart number
 * # of players at position vs starting roster capabilities
 * Injuries
 * Weekly scores (and trends)
 *  
 * */ 

const Analysis = ({ team }) => {
  
  useEffect(() => {
    calculatePositionStrengths(team.playersMap);
  }, [team])

  return (
    <div className="">
      <p>Analysis</p>
    </div>
  )
}

export default Analysis;