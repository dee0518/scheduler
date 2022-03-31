import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router'
import { Button, Calendar, SearchForm, SelectBox, Wrapper } from "../../../Path"
import ScheduleMenu from "./ScheduleMenu"
import NewScheduleModal from "./NewScheduleModal"

function ScheduleView(){
    const navigator = useNavigate()
    const params = useParams()
    const list = ['Month', 'Week','Day']
    const buttonList = [{
        className: 'close-btn',
        name: '닫기'
    },{
        className: 'save-btn',
        name: '저장'
    }]
    const [searchValue, setSearchValue] = useState('')
    const [selectValue, setSelectValue] = useState('month')
    const [modalState, setModalState] = useState(true)
    const [alarm, setAlarm] = useState(false)

    const onChangeSearch = (e) => setSearchValue(e.target.value)
    const onChangeSelect = (e) => {
        setSelectValue(e.target.value)    
    }
    const onClickAddBtn = () => setModalState(true)
    const onClickAlarmBtn = () => setAlarm(true)
    const onClickModalBtn = (e) => {
        if(e.target.textContent === '저장'){

        }

        setModalState(false)
    }

    useEffect(() => {
        let url = createUrl(selectValue)
        navigator(url)
    },[selectValue])

    const createUrl = (type = 'month') => {
        let url = ''
        if(Object.keys(params).length === 0){
            let today = new Date()
            url = `calendar/${type}/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
        } else {
            url = `${params.sub}/${type}/${params.year}/${params.month}/${params.date}`
        }

        return url
    }

    return (
        <Wrapper className="schedule-view-wrapper">
            <ScheduleMenu/>
            <Wrapper className="search-cal-group">
                <Wrapper className="top-group">
                    <SearchForm
                        value={searchValue} 
                        onChange={onChangeSearch}
                    />
                    <Button className={'alarm-btn'} onClick={onClickAlarmBtn}>Alarm</Button>
                </Wrapper>
                <Wrapper className="select-add-group">
                    <SelectBox list={list} value={selectValue} onChange={onChangeSelect}/>
                    <Button className={'add-btn'} onClick={onClickAddBtn}>Add</Button>
                </Wrapper>
                <Calendar type={'grid'} params={params}/>
            </Wrapper>  

            {/* modal */}
            {
                modalState && <NewScheduleModal buttonList={buttonList} onClickModalBtn={onClickModalBtn}/>
            }

            {/* alarm */}
        </Wrapper>
    )
}

export default ScheduleView