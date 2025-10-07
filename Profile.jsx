import { useEffect, useState } from "react"
import { supabase } from "./supabase"
import "./Profile.css"
import AvatarUploader from "./AvatarUploader"

export default function Profile({session}) {

    const [isEditing, setIsEditing] = useState([])
    const [form, setForm] = useState({
        username: "",
        full_name: "",
        bio: "",
        avatar_url: "",        
    })

    const userId = session.user.id
    const userEmail = session.user.email

    useEffect(() => {
      async function loadProfile() {
        const {data} = await supabase
        .from("Profiles")
        .select("username, full_name, bio, avatar_url")
        .eq("id", userId)
        .single()
        
      setForm(data)
      }
      loadProfile()
    }, [userId])

    async function handleClick() {
        const {error} = await supabase.auth.signOut()
        if (error) {
            console.error(error)
        }
    }

    function inputCollector(key, value) {
        const updatedForm = { ...form };
        updatedForm[key] = value;
        setForm(updatedForm);
    }

    console.log(form)
    

    async function handleSave(e){
        e.preventDefault()
        console.log("handle save starts")
        const payload = {
            id: session.user.id,
            email: session.user.email,
            username: form.username,
            full_name: form.full_name,
            bio: form.bio,
            avatar_url: form.avatar_url,
            updated_at: new Date().toISOString(),
        }
        await supabase.from("Profiles").upsert([payload])
        console.log("handle save ends")
        setIsEditing(!isEditing)
    }

    function handleChange(e) {
      const file = e.target.files[0]
      console.log(file)
      const path = `${userId}/avatar.png`
      console.log(path)
      supabase.storage.from("Avatars").upload(path, file)
    }

    return (
        <div className="profile">
      <div className="panel">
        <div className="header">
          <div className="title">Профиль</div>
          <div className="row">
            <button onClick={handleClick} className="btn-ghost">
              Выход
            </button>
          </div>
        </div>
        <div className="info stack">
          <p>
            <strong>ID</strong> {session.user.id}
          </p>
          <p>
            <strong>EMAIL</strong> {session.user.email}
          </p>
        </div>
        {isEditing ? (
            <form onSubmit={handleSave}>
          <input
            value={form.username}
            onChange={(e) => inputCollector("username", e.target.value)}
            placeholder="Псевдоним"
          />
          <input
            value={form.full_name}
            onChange={(e) => inputCollector("full_name", e.target.value)}
            placeholder="ФИО"
          />
          <input
            value={form.bio}
            onChange={(e) => inputCollector("bio", e.target.value)}
            placeholder="Статус"
          />
          <input type="file" onChange={handleChange}/>
          <button type="button" onClick={()=>{setIsEditing(!isEditing)}}>Отмена</button>
          <button type="submit" className="btn-primary">
            Изменить
          </button>
        </form>
        ) : (
          <div className="profile-view card">
            {/*<AvatarUploader userId={userId} url={}/>*/}
            <input type="file" onChange={handleChange}/>
            <img
              className="avatar"
              src={
                "https://i.pinimg.com/736x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg"
              }
              alt="Аватар"
            />
            <div className="meta">
              <h2 className="name">{form.full_name || "Без имени"}</h2>
              <div className="username">
                {form.username ? `@${form.username}` : "—"}
              </div>
              {form.bio && <p className="bio">{form.bio}</p>}
              <div className="ids">
                <div>
                  <strong>ID:</strong> {session.user.id}
                </div>
                <div>
                  <strong>Email:</strong> {session.user.email}
                </div>
              </div>
              <div className="actions">
                <button onClick={() => setIsEditing(true)} className="btn-primary">
                  Редактировать
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    )
}