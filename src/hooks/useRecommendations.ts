import { useMemo } from 'react';
import { Activity, HistoryItem } from '../types';

export const useRecommendations = (
  activities: Activity[],
  history: HistoryItem[],
  interests: string[] = []
) => {
  const recommendedActivities = useMemo(() => {
    // 1. Filter out activities user is already joined to
    const availableActivities = activities.filter(a => !a.isJoined);

    // 2. Calculate category weights from history
    const categoryWeights: Record<string, number> = {};
    
    // Give more weight to check-ins than just joins
    history.forEach(item => {
      const weight = item.action === 'checked-in' ? 3 : item.action === 'joined' ? 1 : 0;
      const activity = activities.find(a => a.id === item.activityId);
      if (activity) {
        categoryWeights[activity.category] = (categoryWeights[activity.category] || 0) + weight;
      }
    });

    // 3. Score activities
    const scoredActivities = availableActivities.map(activity => {
      let score = 0;

      // Category match from history
      score += (categoryWeights[activity.category] || 0) * 2;

      // Interest match
      const interestMatches = interests.some(interest => 
        activity.title.toLowerCase().includes(interest.toLowerCase()) ||
        activity.description.toLowerCase().includes(interest.toLowerCase()) ||
        activity.category.toLowerCase().includes(interest.toLowerCase())
      );
      
      if (interestMatches) {
        score += 10; // Significant boost for stated interests
      }

      // Popularity bonus
      score += (activity.currentParticipants / activity.maxParticipants) * 5;

      return { activity, score };
    });

    // 4. Sort and return top recommendations
    return scoredActivities
      .sort((a, b) => b.score - a.score)
      .filter(item => item.score > 0 || interests.length === 0) // Only recommend if there's some relevance
      .slice(0, 3)
      .map(item => item.activity);
  }, [activities, history, interests]);

  return recommendedActivities;
};
