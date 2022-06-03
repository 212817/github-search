import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';

import API from 'API/api';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

import Input from 'components/Input/Input';
import Alert, { alertType } from 'components/Alert/Alert';
import { transformData } from 'utils/parceData';
import { IUser, userFields } from 'types/IType';



const SearchUsers = () => {
    const [users, setUsers] = useState<IUser[]>([] as IUser[]);
    const [showUsers, setshowUsers] = useState<number>(10);
    const [isloading, setisLoading] = useState<boolean>(false);
    const [errore, setErrore] = useState<boolean>(false);
    const [setIsFetching] = useInfiniteScroll(loadMore);

    function loadMore() {
        setIsFetching(false);
        setshowUsers((prev) => prev + 10);
    }

    const getUsers = async (searchQuery = '%3E1') => {
        setisLoading(true)
        await API.get(`search/users?q=${searchQuery}`)
            .then(res => transformData(res.data.items, userFields))
            .then(res => {
                setErrore(false)
                setUsers(res)
                setisLoading(false)
            })
            .catch(error => {
                setisLoading(false)
                setErrore(true);
            })
    }

    const search = useCallback((value: string) => {
        getUsers(`${value}%20in:login&per_page=100`);
    }, [])

    const listUsers = () => {
        return users.slice(0, showUsers).map((item) =>
            <div className="repo-header-name" key={item.id}>
                <div>
                    <Link className="listUser" to={`/${item.login}`}>
                        <div className="avatar">
                            <img src={item.avatar_url} alt="" />
                        </div>
                        <p>  {item.login}</p>
                        <p>Repo ## {item.id}</p>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <Input search={search} placeholder={'Search for Users'} />
            {isloading && <Alert type={alertType.Loading}>Loading ....</Alert>}
            {errore && <Alert type={alertType.Error}>Something went wrong, try again later</Alert>}
            {listUsers()}
        </>
    )
}

export default SearchUsers