import { makeStyles, Theme } from '@material-ui/core'
import { Skeleton, SkeletonProps, SkeletonTypeMap } from '@material-ui/lab'
import { FunctionComponent } from 'react'
import ReactResizeDetector from 'react-resize-detector'

type SkeletonPropsWithWidth<D extends React.ElementType = SkeletonTypeMap['defaultComponent']> =
  & Omit<SkeletonProps<D>, 'width'>
  & Required<Pick<SkeletonProps<D>, 'width'>>

type AspectRatioSkeletonProps<D extends React.ElementType = SkeletonTypeMap['defaultComponent']> =
  & Omit<SkeletonPropsWithWidth<D>, 'height' | 'variant'>
  & {
    ratio: number,
    defaultHeight?: number
  }

const AspectRatioSkeleton: FunctionComponent<AspectRatioSkeletonProps> = (props) => {
  const {
    width: initialWidth,
    defaultHeight,
    ratio,
    ...skeletonProps
  } = props

  return (
    <ReactResizeDetector handleWidth>
      {({ width: calculatedWidth }: { width?: number | null }) => (
        <Skeleton
          variant='rect'
          width={initialWidth}
          height={
            calculatedWidth != null
              ? ratio * calculatedWidth
              : (defaultHeight ?? 200)
          }
        />
      )}
    </ReactResizeDetector>
  )
}

export { AspectRatioSkeleton }
