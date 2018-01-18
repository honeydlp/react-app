import React from 'react'
import { Redirect } from 'react-router-dom'
import { update } from '../../Redux/user.redux'
import { connect } from 'react-redux'
import {InputItem,TextareaItem,Button,NavBar} from 'antd-mobile'
import AvatarSelector from '../../Component/avatorList/avatorList'

@connect(
    state => state.user,
    {update}
)

class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
			desc:'',
			company:'',
			money:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        let pathname = this.props.location.pathname
        let redirect = this.props.redirectTo
        console.log(redirect)
        let RedirectCom =  redirect && redirect!==pathname ? <Redirect to={redirect}></Redirect>:null
        return (
            <div>
                {RedirectCom}
                <NavBar mode="dark" >牛人完善信息页</NavBar>
                <AvatarSelector 
					selectAvatar={(imgname)=>{
						this.setState({
							avatar:imgname
						})
					}}
				></AvatarSelector>
				<InputItem onChange={(v)=>this.onChange('title',v)}>
					求职岗位
				</InputItem>
				<TextareaItem
					onChange={(v)=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='个人简介'
				>
					
				</TextareaItem>
				<Button 
					onClick={()=>{
						this.props.update(this.state)
					}}
					type='primary'>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo