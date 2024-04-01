import React, { useEffect } from 'react'
import { usePet } from '../../context/PetContext'
import { useParams } from 'react-router-dom'

function EditPet() {

    const { petDetail } = usePet()
    console.log('petDetail: ', petDetail);

    const { petId } = useParams()
    
    useEffect(() => {
        
    }, [])
  return (
    <div>
       <div className="card">
        {petDetail && (
          <>
            <img
              className={`${style.image} card__image`}
              src={petDetail.picture || null}
              alt="Pet image"
            />

            <h1>{petDetail?.name}</h1>
            <h2>About</h2>
            <p>
              <span>Adoption status:</span> {adoptionStatus}
            </p>
            <p>
              <span>Type:</span> {petDetail?.type}
            </p>
            <p>
              <span>Height:</span> {petDetail?.height}
            </p>
            <p>
              <span>Weight:</span> {petDetail?.weight}
            </p>
            <p>
              <span>Color:</span> {petDetail?.color}
            </p>
            <p>
              <span>Bio:</span> {petDetail?.bio}
            </p>
            <p>
              <span>Hypoallergenic:</span> {petDetail?.hypoallergenic}
            </p>
            <p>
              <span>Dietary:</span> Restrictions{" "}
              {petDetail?.dietaryRestrictions}
            </p>
            <p>
              <span>Breed:</span> {petDetail?.breed}
            </p>
          </>
        )}
      </div>     
    </div>
  )
}

export default EditPet