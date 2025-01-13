import { SvgIconComponent } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

export interface KPICardProps {
    title: string;
    value?: string | number;
    iconBackgroundColor?: string;
    icon?: SvgIconComponent;
    loading?: boolean;
}

export function KPICard({
    title,
    value,
    icon: Icon,
    iconBackgroundColor = 'primary.main',
    loading,
}: KPICardProps) {
    return (
        <Card>
            <Box display="flex" justifyContent="space-between" p={2} py={3}>
                <Box textAlign="left" lineHeight={1.25} flex={1}>
                    {loading ? (
                        <>
                            <Skeleton width="55%">
                                <Typography variant="body2">{'.'}</Typography>
                            </Skeleton>

                            <Skeleton width="40%">
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    mt={0.5}
                                >
                                    {'.'}
                                </Typography>
                            </Skeleton>
                        </>
                    ) : (
                        <>
                            <Typography variant="body2" fontWeight="medium">
                                {title}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                mt={0.5}
                            >
                                {value}
                            </Typography>
                        </>
                    )}
                </Box>
                {loading ? (
                    <Box borderRadius=".5rem" overflow="hidden">
                        <Skeleton
                            width={46}
                            height={46}
                            variant="rectangular"
                        />
                    </Box>
                ) : (
                    <Box display="flex" alignItems="center">
                        <Box
                            p={1}
                            borderRadius={2}
                            bgcolor={iconBackgroundColor}
                            color="white"
                            display="flex"
                            justifyContent="center"
                            alignItems="cente"
                        >
                            <SvgIcon>{!!Icon && <Icon />}</SvgIcon>
                        </Box>
                    </Box>
                )}
            </Box>
        </Card>
    );
}
