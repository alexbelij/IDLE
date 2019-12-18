import React from 'react';

import Icon from '../utils/Icon';
import arrowLeft from '../../assets/icons/arrow-left.svg'
import arrowRight from '../../assets/icons/arrow-right.svg'
import dollar from '../../assets/icons/dollar.svg'

//////////////////////////////////////////////////////////////////////

const FONT_SIZE_PRODUCTION = '20px';

//////////////////////////////////////////////////////////////////////

interface Props
{
	tabName : string,
	onTabNameClick ?: () => void,
	totalMoney : string,
	productionRate : string
	style ?: React.CSSProperties
}

//////////////////////////////////////////////////////////////////////

const TopStatus : React.FC<Props> = ( { tabName, onTabNameClick, totalMoney, productionRate, style } : Props ) =>
{
	return	(
				<div style={{ ...mainStyle, ...style }} title={ onTabNameClick && 'Go back' } >

					<div onClick={ onTabNameClick }>
						{ onTabNameClick && <Icon file={  arrowLeft } /> }
						<div style={{ fontSize : '30px', fontWeight : 'lighter' }}>{ tabName }</div>
					</div>

					<div style={ productionStyle }>
						<Icon file={ dollar } style={{ marginRight : '10px' }} ratio={ FONT_SIZE_PRODUCTION } />
						{ totalMoney }
						<Icon file={ arrowRight } style={{ marginRight : '10px', marginLeft : '10px' }} ratio={ FONT_SIZE_PRODUCTION } />
						{ productionRate }
						&nbsp;/ s
					</div>

				</div>
			);
}

//////////////////////////////////////////////////////////////////////

const mainStyle : React.CSSProperties =
{
	display : 'flex',
	justifyContent : 'space-between',
	alignItems : 'center',
	padding : '20px'
}

const productionStyle : React.CSSProperties =
{
	display : 'flex',
	alignItems : 'center',
	justifyContent : 'space-arround',
	fontSize : FONT_SIZE_PRODUCTION,
}

//////////////////////////////////////////////////////////////////////

export default TopStatus;