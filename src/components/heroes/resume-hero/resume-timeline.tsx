import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineProps, TimelineSeparator } from '@mui/lab'
import { FunctionComponent } from 'react'
import { DateTime } from 'luxon'
import { Link, Typography, useTheme } from '@mui/material'
import { Stack } from '@mui/system'
import { urls } from '$constants'

type Experience = {
  title: string,
  location: {
    title: string,
    link?: string | null
  },
  timelapse: {
    from: Date,
    to?: Date | null
  }
}

const experiences: Experience[] = [
  {
    title: 'Freelance',
    location: {
      title: 'Straight To The Fit'
    },
    timelapse: {
      from: DateTime.fromISO('2023-07').toJSDate(),
      to: null
    }
  },
  {
    title: 'CEO / CPO',
    location: {
      title: 'Homère',
      link: urls.homere
    },
    timelapse: {
      from: DateTime.fromISO('2021-01').toJSDate(),
      to: DateTime.fromISO('2023-06').toJSDate()
    }
  },
  {
    title: 'CTO / CPO',
    location: {
      title: 'Algar',
      link: urls.algar
    },
    timelapse: {
      from: DateTime.fromISO('2017-11').toJSDate(),
      to: DateTime.fromISO('2020-11').toJSDate(),
    }
  },
  {
    title: 'Tech Lead',
    location: {
      title: 'Citymagine',
      link: urls.citymagine
    },
    timelapse: {
      from: DateTime.fromISO('2016-09').toJSDate(),
      to: DateTime.fromISO('2017-10').toJSDate(),
    }
  },
  {
    title: 'Enseignant',
    location: {
      title: 'eXia.cesi',
      link: urls.cesi
    },
    timelapse: {
      from: DateTime.fromISO('2016-01').toJSDate(),
      to: DateTime.fromISO('2016-07').toJSDate(),
    }
  },
  // {
  //   title: 'Lead dev',
  //   location: {
  //     title: 'Everysens',
  //     link: urls.everysens
  //   },
  //   timelapse: {
  //     from: DateTime.fromISO('2015-08').toJSDate(),
  //     to: DateTime.fromISO('2015-10').toJSDate(),
  //   }
  // },
  {
    title: 'Lead dev',
    location: {
      title: 'Etineo',
      link: urls.etineo
    },
    timelapse: {
      from: DateTime.fromISO('2011-06').toJSDate(),
      to: DateTime.fromISO('2015-07').toJSDate(),
    }
  }
]

type ResumeTimelineProps = Omit<TimelineProps, 'children' | 'ref'>

const ResumeTimeline: FunctionComponent<ResumeTimelineProps> = (props) => { 
  const theme = useTheme()
  const {
    ...timeLineProps
  } = props

  return (
    <Timeline {...timeLineProps}>
      {experiences.map((experience, i) => {
        const yearFrom = DateTime.fromJSDate(experience.timelapse.from).toFormat('yyyy')
        // const yearTo = experience.timelapse.to != null
        //   ? DateTime.fromJSDate(experience.timelapse.from).toFormat('yyyy')
        //   : '∞'

        // const years = yearFrom !== yearTo
        //   ? <>{yearFrom}&nbsp;-&nbsp;{yearTo}</>
        //   : yearFrom

        return (
          <TimelineItem key={i}>
            <TimelineOppositeContent>
              <Stack>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  fontSize="1.2em"
                  component="span"
                >
                  { experience.title }
                </Typography>

                {experience.location.link != null
                  ? <Link
                      variant="body2"
                      color='text.secondary'
                      href={experience.location.link}
                    >{ experience.location.title }</Link>
                  : <Typography
                      variant="body2"
                      color="text.secondary"
                    >{ experience.location.title }</Typography>
                }
              </Stack>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                sx={{ p: 1, my: 2.5, mx: 1 }}
                variant='outlined'
                // color='primary'
              />

              {i !== experiences.length - 1
                ? <TimelineConnector sx={{ py: 2 }}  />
                : null
              }
            </TimelineSeparator>
            <TimelineContent
              variant="body2"
              sx={{
                mt: 1.7,
                fontWeight: theme.typography.variants.mono.fontWeightRegular,
                fontFamily: theme.typography.variants.mono.fontFamily,
                // fontSize: theme.typography.variants.mono.fontSize,
              }}
              color="text.secondary"
            >
              {yearFrom}
            </TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}

export { ResumeTimeline }
