'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Animal } from '../../../migrations/00000-createTableAnimals';
import ErrorMessage from '../../ErrorMessage';
import styles from './AnimalsForm.module.scss';

type Props = {
  animals: Animal[];
};

export default function AnimalsForm(props: Props) {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [type, setType] = useState('');
  const [accessory, setAccessory] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  // Reset form states to default values so that the form is
  // cleared after an add, edit or delete action
  function resetFormStates() {
    setId(0);
    setFirstName('');
    setType('');
    setAccessory('');
    setBirthDate(new Date());
  }

  return (
    <>
      <h1>Animal Dashboard</h1>

      <div className={styles.dashboard}>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Accessory</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {props.animals.map((animal) => (
                <tr
                  key={`animal-${animal.id}`}
                  className={id === animal.id ? styles.selectedItem : ''}
                >
                  <td>{animal.firstName}</td>
                  <td>{animal.type}</td>
                  <td>{animal.accessory}</td>
                  <td>{dayjs(animal.birthDate).format('YYYY-MM-DD')}</td>
                  <td className={styles.buttonCell}>
                    <button
                      disabled={id === animal.id}
                      onClick={() => {
                        setId(animal.id);
                        setFirstName(animal.firstName);
                        setType(animal.type);
                        // Default to an empty string to avoid
                        // errors with passing null to input
                        // values
                        setAccessory(animal.accessory || '');
                        setBirthDate(animal.birthDate);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        const response = await fetch(
                          `/api/animals/${animal.id}`,
                          {
                            method: 'DELETE',
                          },
                        );

                        setErrorMessage('');

                        if (!response.ok) {
                          let newErrorMessage = 'Error deleting the animal';

                          try {
                            const body = await response.json();
                            newErrorMessage = body.error;
                          } catch (error) {
                            // Don't fail if response JSON body
                            // cannot be parsed
                          }

                          // TODO: Use toast instead of showing
                          // this below creation / update form
                          setErrorMessage(newErrorMessage);
                          return;
                        }

                        router.refresh();

                        // Reset form states if deleting an
                        // animal after editing it
                        resetFormStates();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.animalForm}>
          <div>
            <h2>{id ? 'Edit Animal' : 'Add Animal'}</h2>
            <form
              onSubmit={async (event) => {
                event.preventDefault();

                if (id) {
                  const response = await fetch(`/api/animals/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                      firstName,
                      type,
                      accessory,
                      birthDate,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });

                  setErrorMessage('');

                  if (!response.ok) {
                    let newErrorMessage = 'Error updating the animal';

                    try {
                      const body = await response.json();
                      newErrorMessage = body.error;
                    } catch (error) {
                      console.log('err', error);
                      // Don't fail if response JSON body cannot
                      // be parsed
                    }

                    setErrorMessage(newErrorMessage);
                    return;
                  }
                } else {
                  const response = await fetch('/api/animals', {
                    method: 'POST',
                    body: JSON.stringify({
                      firstName,
                      type,
                      accessory,
                      birthDate,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });

                  setErrorMessage('');

                  if (!response.ok) {
                    let newErrorMessage = 'Error creating the animal';

                    try {
                      const body = await response.json();
                      newErrorMessage = body.error;
                    } catch (error) {
                      // Don't fail if response JSON body cannot
                      // be parsed
                    }

                    setErrorMessage(newErrorMessage);
                    return;
                  }
                }

                router.refresh();
                resetFormStates();
              }}
            >
              <label>
                Name
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              </label>
              <label>
                Type
                <input
                  value={type}
                  onChange={(event) => setType(event.currentTarget.value)}
                />
              </label>
              <label>
                Accessory
                <input
                  value={accessory}
                  onChange={(event) => setAccessory(event.currentTarget.value)}
                />
              </label>
              <label>
                Birth Date
                <input
                  type="date"
                  value={dayjs(birthDate).format('YYYY-MM-DD')}
                  onChange={(event) =>
                    setBirthDate(new Date(event.currentTarget.value))
                  }
                />
              </label>
              <button>{id ? 'Save Changes' : 'Add Animal'}</button>
            </form>

            <ErrorMessage>{errorMessage}</ErrorMessage>
          </div>
        </div>
      </div>
    </>
  );
}
